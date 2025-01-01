// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	adminRepo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admincontrollers"

	mock "github.com/stretchr/testify/mock"
)

// UserpermissionmanagementRepository is an autogenerated mock type for the UserpermissionmanagementRepository type
type UserpermissionmanagementRepository struct {
	mock.Mock
}

// CreateUserPermission provides a mock function with given fields: userPermissionManagementRequest
func (_m *UserpermissionmanagementRepository) CreateUserPermission(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	ret := _m.Called(userPermissionManagementRequest)

	if len(ret) == 0 {
		panic("no return value specified for CreateUserPermission")
	}

	var r0 []adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error)); ok {
		return rf(userPermissionManagementRequest)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) []adminmodels.Permissions); ok {
		r0 = rf(userPermissionManagementRequest)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]adminmodels.Permissions)
		}
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.UserPermissionManagementRequest) error); ok {
		r1 = rf(userPermissionManagementRequest)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetUserPermission provides a mock function with given fields: userPermissionManagementRequest
func (_m *UserpermissionmanagementRepository) GetUserPermission(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	ret := _m.Called(userPermissionManagementRequest)

	if len(ret) == 0 {
		panic("no return value specified for GetUserPermission")
	}

	var r0 []adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error)); ok {
		return rf(userPermissionManagementRequest)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) []adminmodels.Permissions); ok {
		r0 = rf(userPermissionManagementRequest)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]adminmodels.Permissions)
		}
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.UserPermissionManagementRequest) error); ok {
		r1 = rf(userPermissionManagementRequest)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// HandleUserPermissionUpdate provides a mock function with given fields: userPermissionManagementRequest
func (_m *UserpermissionmanagementRepository) HandleUserPermissionUpdate(userPermissionManagementRequest *adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error) {
	ret := _m.Called(userPermissionManagementRequest)

	if len(ret) == 0 {
		panic("no return value specified for HandleUserPermissionUpdate")
	}

	var r0 []adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) ([]adminmodels.Permissions, error)); ok {
		return rf(userPermissionManagementRequest)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.UserPermissionManagementRequest) []adminmodels.Permissions); ok {
		r0 = rf(userPermissionManagementRequest)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]adminmodels.Permissions)
		}
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.UserPermissionManagementRequest) error); ok {
		r1 = rf(userPermissionManagementRequest)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewUserpermissionmanagementRepository creates a new instance of UserpermissionmanagementRepository. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewUserpermissionmanagementRepository(t interface {
	mock.TestingT
	Cleanup(func())
}) *UserpermissionmanagementRepository {
	mock := &UserpermissionmanagementRepository{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}