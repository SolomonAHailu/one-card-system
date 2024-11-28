package usecase_test

import (
	"testing"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/SolomonAHailu/one-card-system/skeletons/mocks"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo"
	"github.com/SolomonAHailu/one-card-system/skeletons/usecase"
	"github.com/stretchr/testify/assert"
	// "github.com/stretchr/testify/mock"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

func TestDevice(t *testing.T) {
	mockDevice := mocks.NewDeviceRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateDeviceReques := &repo.CreateDeviceReques{
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