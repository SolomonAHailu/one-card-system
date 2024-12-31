package admincontrollers

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"gopkg.in/gomail.v2"
	"gorm.io/gorm"
)

// Send HTML email sends an email with HTML content.
func SendHTMLEmail(c *gin.Context, db *gorm.DB) {
	// Define the request body structure
	type EmailRequest struct {
		Name            string   `json:"name" binding:"required"`
		To              string   `json:"email" binding:"required"`
		Password        string   `json:"password" binding:"required"`
		Role            string   `json:"role" binding:"required"`
		RoleDescription []string `json:"roledescription" binding:"required"`
		Subject         string   `json:"subject" binding:"required"`
	}

	var req EmailRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	// Get SMTP configuration from environment variables
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPortStr := os.Getenv("SMTP_PORT")
	smtpPort, err := strconv.Atoi(smtpPortStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid SMTP port", "details": err.Error()})
		return
	}
	senderEmail := os.Getenv("SMTP_USER")
	passwordSender := os.Getenv("SMTP_PASS")

	// Generate the bullet points with checkmarks
	bulletPoints := ""
	for _, desc := range req.RoleDescription {
		bulletPoints += `
			<li style="margin-bottom: 8px;">
				<span style="display: inline-block; font-size: 14px; font-weight: bold; margin-right: 10px;">✔</span>
				` + desc + `
			</li>`
	}

	// Create the HTML content
	body := `
	<!DOCTYPE html>
	<html>
	<head>
		<style>
			@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
			body {
				font-family: 'Poppins', Arial, sans-serif;
				background-color: #f8f9fa;
				color: #333;
				font-size: 16px;
				line-height: 1.6;
				padding: 20px;
				margin: 0;
			}
			.container {
				padding: 20px;
				border: 1px solid #e0e0e0;
				border-radius: 8px;
				max-width: 600px;
				margin: auto;
				background: #ffffff;
			}
			h2 {
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 10px;
				color: #007bff;
			}
			p {
				margin: 10px 0;
			}
			ul {
				padding-left: 0;
				list-style: none;
			}
			.button {
				display: inline-block;
				padding: 12px;
				font-size: 16px;
				color: white;
				background-color: #007bff;
				border: none;
				border-radius: 5px;
				text-decoration: none;
				text-align: center;
				margin: 20px auto;
				display: block;
				width: fit-content;
			}
			a.button {
			    color: white;
			}
			a.button:hover {
				background-color: #0056b3;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h2>` + req.Subject + `</h2>
			<p>Dear ` + req.Name + `,</p>
			<p>You have been assigned the role: <strong>` + req.Role + `</strong>.</p>
			<p>Role Description</p>
			<ul>` + bulletPoints + `</ul>
			<p>Your temporary password is: <strong>` + req.Password + `</strong></p>
			<p><strong>Please save this password securely and update it after logging in.</strong></p>
			<a href="http://localhost:3000" class="button">Login Now</a>
			<p>If you have any issues, feel free to contact us.</p>
			<p>Best Regards,</p>
			<p>The Support Team</p>
		</div>
	</body>
	</html>`

	// Create a new email message
	m := gomail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", req.To)
	m.SetHeader("Subject", req.Subject)
	m.SetBody("text/html", body)

	// Configure the email dialer
	d := gomail.NewDialer(smtpHost, smtpPort, senderEmail, passwordSender)

	// Send the email
	if err := d.DialAndSend(m); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully!"})
}
