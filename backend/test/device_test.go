package usecase_test

import (
	"errors"
	"testing"

	"github.com/SolomonAHailu/one-card-system/skeletons/mocks"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo"
	"github.com/SolomonAHailu/one-card-system/skeletons/usecase"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

	// "github.com/stretchr/testify/mock"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

func TestCreateDevice(t *testing.T) {
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
		device, err := uc.CreatedDevice(mockCreateDeviceReques)

		assert.NoError(t, err)
		assert.Equal(t, mockDeviceTest, device)
		mockDevice.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockDevice.On("CreatedDevice",  mockCreateDeviceReques).Return(adminmodels.Devices{}, errors.New("unexpected")).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.CreatedDevice(mockCreateDeviceReques)

		assert.Error(t, err)
		assert.Equal(t, device, adminmodels.Devices{})
		mockDevice.AssertExpectations(t)
	})
}

func TestGetAllDevices(t *testing.T) {
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

		mockDevice.On("GetAllDevices",  mockCreateDeviceReques).Return(mockDeviceTest, nil).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.GetAllDevices(mockCreateDeviceReques)

		assert.NoError(t, err)
		assert.Equal(t, mockDeviceTest, device)
		mockDevice.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockDevice.On("GetAllDevices",  mockCreateDeviceReques).Return(adminmodels.Devices{}, errors.New("unexpected")).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.GetAllDevices(mockCreateDeviceReques)

		assert.Error(t, err)
		assert.Equal(t, device, adminmodels.Devices{})
		mockDevice.AssertExpectations(t)
	})
}

func TestGetDeviceById(t *testing.T) {
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

		mockDevice.On("GetDeviceById",  mockCreateDeviceReques).Return(mockDeviceTest, nil).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.GetDeviceById(mockCreateDeviceReques)

		assert.NoError(t, err)
		assert.Equal(t, mockDeviceTest, device)
		mockDevice.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockDevice.On("GetDeviceById",  mockCreateDeviceReques).Return(adminmodels.Devices{}, errors.New("unexpected")).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.GetDeviceById(mockCreateDeviceReques)

		assert.Error(t, err)
		assert.Equal(t, device, adminmodels.Devices{})
		mockDevice.AssertExpectations(t)
	})
}



func TestUpdateDeviceById(t *testing.T) {
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

		mockDevice.On("UpdateDeviceById",  mockCreateDeviceReques).Return(mockDeviceTest, nil).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.UpdateDeviceById(mockCreateDeviceReques)

		assert.NoError(t, err)
		assert.Equal(t, mockDeviceTest, device)
		mockDevice.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockDevice.On("UpdateDeviceById",  mockCreateDeviceReques).Return(adminmodels.Devices{}, errors.New("unexpected")).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.UpdateDeviceById(mockCreateDeviceReques)

		assert.Error(t, err)
		assert.Equal(t, device, adminmodels.Devices{})
		mockDevice.AssertExpectations(t)
	})
}


func TestDeleteDeviceById(t *testing.T) {
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

		mockDevice.On("DeleteDeviceById",  mockCreateDeviceReques).Return(mockDeviceTest, nil).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.DeleteDeviceById(mockCreateDeviceReques)

		assert.NoError(t, err)
		assert.Equal(t, mockDeviceTest, device)
		mockDevice.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockDevice.On("DeleteDeviceById",  mockCreateDeviceReques).Return(adminmodels.Devices{}, errors.New("unexpected")).Once()
		uc := usecase.NewDeviceUsecase(mockDevice)
		device, err := uc.DeleteDeviceById(mockCreateDeviceReques)

		assert.Error(t, err)
		assert.Equal(t, device, adminmodels.Devices{})
		mockDevice.AssertExpectations(t)
	})
}