package registrarcontrollers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"

	dac "github.com/Snawoot/go-http-digest-auth-client"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/models/registrarmodels"
	"github.com/SolomonAHailu/one-card-system/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetStudents(c *gin.Context, db *gorm.DB) {
	var students []registrarmodels.Student
	var total int64

	// Query parameters
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")
	status := c.Query("status")
	name := c.Query("name")

	// Parse and validate pagination parameters
	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		pageInt = 1
	}
	limitInt, err := strconv.Atoi(limit)
	if err != nil || limitInt < 1 {
		limitInt = 10
	}

	query := db.Model(&registrarmodels.Student{})

	if name != "" {
		query = query.Where("LOWER(first_name) LIKE LOWER(?) OR LOWER(father_name) LIKE LOWER(?) OR LOWER(grand_father_name) LIKE LOWER(?)", "%"+name+"%", "%"+name+"%", "%"+name+"%")
	}

	if status != "" {
		query = query.Where("status = ?", status)
	}
	if err := query.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching students count"})
		return
	}

	// Fetch paginated data with Preloads
	if err := query.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").
		Limit(limitInt).
		Offset((pageInt - 1) * limitInt).
		Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching students"})
		return
	}

	totalPages := int64(math.Ceil(float64(total) / float64(limitInt)))

	// Respond with paginated data
	c.JSON(http.StatusOK, gin.H{
		"data":          students,
		"currentPage":   pageInt,
		"totalPages":    totalPages,
		"totalStudents": total,
	})
}

// Get student by id
func GetStudentById(c *gin.Context, db *gorm.DB) {
	var student registrarmodels.Student
	if err := db.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").First(&student, c.Param("id")).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching student", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": student})
}

func UpdateStudentCardNumber(c *gin.Context, db *gorm.DB) {
	id := c.Param("id")
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")

	// Fetch all devices
	var devices []adminmodels.Devices
	if err := db.Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}

	//Check the status of the device
	for _, device := range devices {
		client := &http.Client{
			Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
		}
		apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessUser.cgi?action=fetch", device.IPAddress)
		_, err := client.Get(apiURL)
		if err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check device status", err)
			return
		}
		fmt.Println("Device with ", device.IPAddress, " is online")
	}
	fmt.Println("All devices are online")

	// Find the student record by ID and preload associations
	var student registrarmodels.Student
	if err := db.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").
		First(&student, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "Student not found", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Database error", err)
		}
		return
	}

	var hasCard bool
	var prevCardNumber string
	if student.CardNumber != nil && *student.CardNumber != "" {
		hasCard = true
		prevCardNumber = *student.CardNumber
		student.CardNumber = nil
	} else {
		hasCard = false
	}

	// Parse incoming JSON data
	var updatedData struct {
		CardNumber string `json:"card_number"`
	}

	if err := c.ShouldBindJSON(&updatedData); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid JSON", err)
		return
	}

	if updatedData.CardNumber != "" {
		student.CardNumber = &updatedData.CardNumber
	}

	// Save changes to the database
	if err := db.Save(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update card number for student"})
		return
	}

	for _, device := range devices {
		sendStudentToDeviceForUpdateCard(device, student, hasCard, prevCardNumber)
	}

	// Send a response with preloaded associations
	c.JSON(http.StatusOK, gin.H{
		"data": student,
	})
}

func UpdateStudentPhoto(c *gin.Context, db *gorm.DB) {
	id := c.Param("id")
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")

	// Fetch all devices
	var devices []adminmodels.Devices
	if err := db.Find(&devices).Error; err != nil {
		utils.ResponseWithError(c, http.StatusInternalServerError, "Error fetching devices", err)
		return
	}

	//Check the status of the device
	for _, device := range devices {
		client := &http.Client{
			Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
		}
		apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessUser.cgi?action=fetch", device.IPAddress)
		_, err := client.Get(apiURL)
		if err != nil {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Failed to check device status", err)
			log.Printf("Failed to check device status: %v\n", err)
			return
		}
		fmt.Println("Device with ", device.IPAddress, " is online")
	}
	fmt.Println("All devices are online")

	// Find the student record by ID and preload associations
	var student registrarmodels.Student
	if err := db.Preload("LibraryAssigned").
		Preload("CafeteriaAssigned").
		Preload("DormitoryAssigned").
		Preload("RegisteredBy").
		First(&student, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			utils.ResponseWithError(c, http.StatusNotFound, "Student not found", err)
		} else {
			utils.ResponseWithError(c, http.StatusInternalServerError, "Database error", err)
		}
		return
	}

	var hasPhoto bool
	if student.Photo != nil && *student.Photo != "" {
		hasPhoto = true
	} else {
		hasPhoto = false
	}

	// Parse incoming JSON data
	var updatedData struct {
		Photo string `json:"photo"`
	}

	if err := c.ShouldBindJSON(&updatedData); err != nil {
		utils.ResponseWithError(c, http.StatusBadRequest, "Invalid JSON", err)
		return
	}

	if updatedData.Photo != "" {
		student.Photo = &updatedData.Photo
	}
	if student.CardNumber == nil || *student.CardNumber == "" {
		student.CardNumber = nil
	}

	// Save changes to the database
	if err := db.Save(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update photo of student"})
		return
	}
	//Send student image to device
	for _, device := range devices {
		sendStudentToDeviceForUpdatePhoto(device, student, hasPhoto)
	}

	// Send a response with preloaded associations
	c.JSON(http.StatusOK, gin.H{
		"data": student,
	})
}

func sendStudentToDeviceForUpdateCard(device adminmodels.Devices, student registrarmodels.Student, hasCard bool, prevCardNumber string) {
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")
	client := &http.Client{
		Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
	}

	if hasCard && student.CardNumber != nil {
		apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessCard.cgi?action=removeMulti&CardNoList[0]=%s", device.IPAddress, prevCardNumber)
		fmt.Println("API URL FOR DELETE USER CARD", apiURL)
		req, err := http.NewRequest(http.MethodDelete, apiURL, nil)
		if err != nil {
			log.Printf("Failed to create DELETE request: %v", err)
			return
		}
		if _, err := client.Do(req); err != nil {
			log.Printf("Failed to send DELETE request: %v", err)
			return
		}
		log.Printf("Card successfully removed for student: %d", student.ID)
	}

	if student.CardNumber != nil {
		apiURL := fmt.Sprintf("http://%s/cgi-bin/AccessCard.cgi?action=insertMulti", device.IPAddress)
		payload := map[string]interface{}{
			"CardList": []map[string]interface{}{
				{"UserID": fmt.Sprintf("%d", student.ID), "CardNo": *student.CardNumber},
			},
		}
		jsonData, _ := json.Marshal(payload)
		resp, err := client.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf("Failed to send POST request: %v", err)
			return
		}
		defer resp.Body.Close()
		log.Printf("Card successfully updated for student: %d", student.ID)
	}
}

func sendStudentToDeviceForUpdatePhoto(device adminmodels.Devices, student registrarmodels.Student, hasPhoto bool) {
	username := os.Getenv("DEVICE_USERNAME")
	password := os.Getenv("DEVICE_PASSWORD")
	client := &http.Client{
		Transport: dac.NewDigestTransport(username, password, http.DefaultTransport),
	}
	var apiURL string
	if !hasPhoto {
		// If no photo, use the insert action to create a new entry
		apiURL = fmt.Sprintf("http://%s/cgi-bin/AccessFace.cgi?action=insertMulti", device.IPAddress)
	} else {
		// If a photo is present, use the update action to update the photo
		apiURL = fmt.Sprintf("http://%s/cgi-bin/AccessFace.cgi?action=updateMulti", device.IPAddress)
	}

	photoBase64 := ""
	if student.Photo != nil {
		photoBase64 = *student.Photo
	}
	userData := map[string]interface{}{
		"UserID":    fmt.Sprintf("%d", student.ID),
		"PhotoData": []string{photoBase64},
	}

	payload := map[string]interface{}{
		"FaceList": []map[string]interface{}{userData},
	}
	log.Println("FACE LIST", payload)
	jsonData, err := json.Marshal(payload)
	if err != nil {
		utils.ResponseWithError(nil, http.StatusInternalServerError, "Failed to marshal JSON payload", err)
		log.Printf("Failed to marshal JSON payload: %v", err)
		return
	}
	// Send HTTP POST request
	resp, err := client.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		utils.ResponseWithError(nil, http.StatusInternalServerError, "Failed to send request to device", err)
		log.Printf("Failed to send request to device: %v", err)
		return
	}
	defer resp.Body.Close()
}
