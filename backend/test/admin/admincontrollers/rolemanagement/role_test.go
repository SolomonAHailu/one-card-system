package usecase_test

import (
	"errors"
	"testing"

	mocks "github.com/SolomonAHailu/one-card-system/skeletons/mocks/admin/admincontrollers/rolemock"
	"github.com/SolomonAHailu/one-card-system/skeletons/repo/admin/admincontrollers/rolemanagement"
	"github.com/SolomonAHailu/one-card-system/skeletons/usecase/admin/admincontrollers/roleusecase"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

	// "github.com/stretchr/testify/mock"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
)

func TestCreateRole(t *testing.T) {
	mockRole := mocks.NewRoleRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRoleRequest := &rolemanagement.CreateRoleRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockRoleTest := adminmodels.Roles{
		RoleName:"123",
		Description	:"123",

	}

	t.Run("success", func(t *testing.T){

		mockRole.On("CreatedRole",  mockCreateRoleRequest).Return(mockRoleTest, nil).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.CreatedRole(mockCreateRoleRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockRoleTest, role)
		mockRole.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockRole.On("CreatedRole",  mockCreateRoleRequest).Return(adminmodels.Roles{}, errors.New("unexpected")).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.CreatedRole(mockCreateRoleRequest)

		assert.Error(t, err)
		assert.Equal(t, role, adminmodels.Roles{})
		mockRole.AssertExpectations(t)
	})
}

func TestGetRoles(t *testing.T) {
	mockRole := mocks.NewRoleRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRoleRequest := &rolemanagement.CreateRoleRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockRoleTest := adminmodels.Roles{
		RoleName: "123",
		Description: "123",

	}

	t.Run("success", func(t *testing.T){

		mockRole.On("GetRoles",  mockCreateRoleRequest).Return(mockRoleTest, nil).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.GetRoles(mockCreateRoleRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockRoleTest, role)
		mockRole.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockRole.On("GetRoles",  mockCreateRoleRequest).Return(adminmodels.Roles{}, errors.New("unexpected")).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.GetRoles(mockCreateRoleRequest)

		assert.Error(t, err)
		assert.Equal(t, role, adminmodels.Roles{})
		mockRole.AssertExpectations(t)
	})
}

func TestGetRole(t *testing.T) {
	mockRole := mocks.NewRoleRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRoleRequest := &rolemanagement.CreateRoleRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockRoleTest := adminmodels.Roles{
		RoleName: "123",
		Description: "123",

	}

	t.Run("success", func(t *testing.T){

		mockRole.On("GetRole",  mockCreateRoleRequest).Return(mockRoleTest, nil).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.GetRole(mockCreateRoleRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockRoleTest, role)
		mockRole.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockRole.On("GetRole",  mockCreateRoleRequest).Return(adminmodels.Roles{}, errors.New("unexpected")).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.GetRole(mockCreateRoleRequest)

		assert.Error(t, err)
		assert.Equal(t, role, adminmodels.Roles{})
		mockRole.AssertExpectations(t)
	})
}



func TestUpdateRole(t *testing.T) {
	mockRole := mocks.NewRoleRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRoleRequest := &rolemanagement.CreateRoleRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockRoleTest := adminmodels.Roles{
		RoleName: "123",
		Description: "123",

	}

	t.Run("success", func(t *testing.T){

		mockRole.On("UpdateRole",  mockCreateRoleRequest).Return(mockRoleTest, nil).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.UpdateRole(mockCreateRoleRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockRoleTest, role)
		mockRole.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockRole.On("UpdateRole",  mockCreateRoleRequest).Return(adminmodels.Roles{}, errors.New("unexpected")).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.UpdateRole(mockCreateRoleRequest)

		assert.Error(t, err)
		assert.Equal(t, role, adminmodels.Roles{})
		mockRole.AssertExpectations(t)
	})
}


func TestDeleteRole(t *testing.T) {
	mockRole := mocks.NewRoleRepository(t)
	cc := &gin.Context{}
	dbb := &gorm.DB{}

	mockCreateRoleRequest := &rolemanagement.CreateRoleRequest{
		Ctx : cc,
		Gm : dbb,
	}

	mockRoleTest := adminmodels.Roles{
		RoleName: "123",
		Description: "123",
	}

	t.Run("success", func(t *testing.T){

		mockRole.On("DeleteRole",  mockCreateRoleRequest).Return(mockRoleTest, nil).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.DeleteRole(mockCreateRoleRequest)

		assert.NoError(t, err)
		assert.Equal(t, mockRoleTest, role)
		mockRole.AssertExpectations(t)
	})


	t.Run("fail", func(t *testing.T){

		mockRole.On("DeleteRole",  mockCreateRoleRequest).Return(adminmodels.Roles{}, errors.New("unexpected")).Once()
		uc := roleusecase.NewRoleUsecase(mockRole)
		role, err := uc.DeleteRole(mockCreateRoleRequest)

		assert.Error(t, err)
		assert.Equal(t, role, adminmodels.Roles{})
		mockRole.AssertExpectations(t)
	})
}