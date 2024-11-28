package usecase_test

import (
	"testing"

	mocks "github.com/SolomonAHailu/one-card-system/skeletons/mocks/admin/admincontrollers"
	repo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admin/admincontrollers"
	usecase "github.com/SolomonAHailu/one-card-system/skeletons/usecase/admin/admincontrollers"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

	// "github.com/stretchr/testify/mock"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

func TestDevice(t *testing.T) {
	mockDevice := mocks.NewDeviceRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateDeviceReques := &repo.CreateDeviceRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockDeviceTest := adminmodels.Devices{
		SerialNumber	:"123",
		Name         	:"123",
		IPAddress    	:"123",
		Port        	:123,
		Location 		:"123",
	}

	t.Run("success", func(t *testing.T){

		mockDevice.On("CreatedDevice",  mockCreateDeviceReques).Return(mockDeviceTest, nil).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		_, err := uc.CreatedDevice(mockCreateDeviceReques)

		assert.NoError(t, err)
		mockDevice.AssertExpectations(t)
	})

}
func TestGetAllDevice(t *testing.T) {
	mockGetAllDevice := mocks.NewGetALLDeviceRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockGetAllDeviceRequest := &repo.GetAllDeviceRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockGetAllDeviceTest := []adminmodels.Devices{
		{
			SerialNumber	:"123",
			Name         	:"123",
			IPAddress    	:"123",
			Port        	:123,
			Location 		:"123",
		},
		{
			SerialNumber	:"123",
			Name         	:"123",
			IPAddress    	:"123",
			Port        	:123,
			Location 		:"123",
		},
	}

	t.Run("success", func(t *testing.T){
		
		mockGetAllDevice.On("GetAllDevices",  mockGetAllDeviceRequest).Return(mockGetAllDeviceTest, nil).Once()
		uc := usecase.NewGetAllDeviceUsecase(mockGetAllDevice)
		_, err := uc.GetAllDevices(mockGetAllDeviceRequest)

		assert.NoError(t, err)
		mockGetAllDevice.AssertExpectations(t)
	})

}