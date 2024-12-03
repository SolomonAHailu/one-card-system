package usecase_test

import (
	// "errors"
	"errors"
	"testing"

	"github.com/SolomonAHailu/one-card-system/skeletons/mocks"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo/admin"
	"github.com/SolomonAHailu/one-card-system/skeletons/usecase/admin"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

	// "github.com/stretchr/testify/mock"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

func TestCreateRolePermission(t *testing.T){
	mockPermissionRepo := mocks.NewRolepermissionmanagementRepository(t)

	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRolePermissionRequest := &adminRepo.RolepermissionmanagementRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockPermission := adminmodels.Permissions{
		PermissionsName : "test",
    	Description  : "test",   
	}

	
	t.Run("success", func(t *testing.T){

		mockPermissionRepo.On("CreateRolePermission",  mockCreateRolePermissionRequest).Return(mockPermission, nil).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permission, err := uc.CreateRolePermission(mockCreateRolePermissionRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockPermission, permission)
		mockPermissionRepo.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockPermissionRepo.On("CreateRolePermission",  mockCreateRolePermissionRequest).Return(adminmodels.Permissions{}, errors.New("unexpected")).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permission, err := uc.CreateRolePermission(mockCreateRolePermissionRequest)

		assert.Error(t, err)
		assert.Equal(t, adminmodels.Permissions{}, permission)
		mockPermissionRepo.AssertExpectations(t)
	})

}


func TestGetRolePermissions(t *testing.T){
	mockPermissionRepo := mocks.NewRolepermissionmanagementRepository(t)

	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRolePermissionRequest := &adminRepo.RolepermissionmanagementRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockPermissions := []adminmodels.Permissions{
		{
		PermissionsName : "test",
		Description  : "test", 
	    },
		{
		PermissionsName : "test2",
		Description  : "test2", 
		},

	}

	
	t.Run("success", func(t *testing.T){

		mockPermissionRepo.On("GetRolePermissions",  mockCreateRolePermissionRequest).Return(mockPermissions, nil).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.GetRolePermissions(mockCreateRolePermissionRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockPermissions, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockPermissionRepo.On("GetRolePermissions",  mockCreateRolePermissionRequest).Return([]adminmodels.Permissions{}, errors.New("unexpected")).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.GetRolePermissions(mockCreateRolePermissionRequest)

		assert.Error(t, err)
		assert.Equal(t, []adminmodels.Permissions{}, permissions)
		assert.Len(t, permissions, 0)
		mockPermissionRepo.AssertExpectations(t)
	})

}

func TestGetRolePermissionByRoleId(t *testing.T){
	mockPermissionRepo := mocks.NewRolepermissionmanagementRepository(t)

	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRolePermissionRequest := &adminRepo.RolepermissionmanagementRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockPermissions := adminmodels.Permissions{
		PermissionsName : "test",
		Description  : "test", 
	}

	
	t.Run("success", func(t *testing.T){

		mockPermissionRepo.On("GetRolePermissionByRoleId",  mockCreateRolePermissionRequest).Return(mockPermissions, nil).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.GetRolePermissionByRoleId(mockCreateRolePermissionRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockPermissions, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockPermissionRepo.On("GetRolePermissionByRoleId",  mockCreateRolePermissionRequest).Return(adminmodels.Permissions{}, errors.New("unexpected")).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.GetRolePermissionByRoleId(mockCreateRolePermissionRequest)

		assert.Error(t, err)
		assert.Equal(t, adminmodels.Permissions{}, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})

}


func TestDeleteRolePermissionById(t *testing.T){
	mockPermissionRepo := mocks.NewRolepermissionmanagementRepository(t)

	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRolePermissionRequest := &adminRepo.RolepermissionmanagementRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockPermissions := adminmodels.Permissions{
		PermissionsName : "test",
		Description  : "test", 
	}

	
	t.Run("success", func(t *testing.T){

		mockPermissionRepo.On("DeleteRolePermissionById",  mockCreateRolePermissionRequest).Return(mockPermissions, nil).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.DeleteRolePermissionById(mockCreateRolePermissionRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockPermissions, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockPermissionRepo.On("DeleteRolePermissionById",  mockCreateRolePermissionRequest).Return(adminmodels.Permissions{}, errors.New("unexpected")).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.DeleteRolePermissionById(mockCreateRolePermissionRequest)

		assert.Error(t, err)
		assert.Equal(t, adminmodels.Permissions{}, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})

}

func TestUpdateRolePermission(t *testing.T){
	mockPermissionRepo := mocks.NewRolepermissionmanagementRepository(t)

	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRolePermissionRequest := &adminRepo.RolepermissionmanagementRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockPermissions := adminmodels.Permissions{
		PermissionsName : "test",
		Description  : "test", 
	}

	
	t.Run("success", func(t *testing.T){

		mockPermissionRepo.On("UpdateRolePermission",  mockCreateRolePermissionRequest).Return(mockPermissions, nil).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.UpdateRolePermission(mockCreateRolePermissionRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockPermissions, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockPermissionRepo.On("UpdateRolePermission",  mockCreateRolePermissionRequest).Return(adminmodels.Permissions{}, errors.New("unexpected")).Once()
		uc := adminUsecase.NewrolepermissionmanagementUsecase(mockPermissionRepo)
		permissions, err := uc.UpdateRolePermission(mockCreateRolePermissionRequest)

		assert.Error(t, err)
		assert.Equal(t, adminmodels.Permissions{}, permissions)
		mockPermissionRepo.AssertExpectations(t)
	})

}