// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	adminRepo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admincontrollers"

	mock "github.com/stretchr/testify/mock"
)

// PermissionmanagementUsecase is an autogenerated mock type for the PermissionmanagementUsecase type
type PermissionmanagementUsecase struct {
	mock.Mock
}

// CreatePermission provides a mock function with given fields: createPermission
func (_m *PermissionmanagementUsecase) CreatePermission(createPermission *adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error) {
	ret := _m.Called(createPermission)

	if len(ret) == 0 {
		panic("no return value specified for CreatePermission")
	}

	var r0 adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error)); ok {
		return rf(createPermission)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) adminmodels.Permissions); ok {
		r0 = rf(createPermission)
	} else {
		r0 = ret.Get(0).(adminmodels.Permissions)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreatePermissionRequest) error); ok {
		r1 = rf(createPermission)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeletePermission provides a mock function with given fields: deletePermission
func (_m *PermissionmanagementUsecase) DeletePermission(deletePermission *adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error) {
	ret := _m.Called(deletePermission)

	if len(ret) == 0 {
		panic("no return value specified for DeletePermission")
	}

	var r0 adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error)); ok {
		return rf(deletePermission)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) adminmodels.Permissions); ok {
		r0 = rf(deletePermission)
	} else {
		r0 = ret.Get(0).(adminmodels.Permissions)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreatePermissionRequest) error); ok {
		r1 = rf(deletePermission)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetPermission provides a mock function with given fields: getPermission
func (_m *PermissionmanagementUsecase) GetPermission(getPermission *adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error) {
	ret := _m.Called(getPermission)

	if len(ret) == 0 {
		panic("no return value specified for GetPermission")
	}

	var r0 adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error)); ok {
		return rf(getPermission)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) adminmodels.Permissions); ok {
		r0 = rf(getPermission)
	} else {
		r0 = ret.Get(0).(adminmodels.Permissions)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreatePermissionRequest) error); ok {
		r1 = rf(getPermission)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetPermissions provides a mock function with given fields: getPermissions
func (_m *PermissionmanagementUsecase) GetPermissions(getPermissions *adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error) {
	ret := _m.Called(getPermissions)

	if len(ret) == 0 {
		panic("no return value specified for GetPermissions")
	}

	var r0 adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error)); ok {
		return rf(getPermissions)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) adminmodels.Permissions); ok {
		r0 = rf(getPermissions)
	} else {
		r0 = ret.Get(0).(adminmodels.Permissions)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreatePermissionRequest) error); ok {
		r1 = rf(getPermissions)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdatePermission provides a mock function with given fields: creatupdatePermissioneDevice
func (_m *PermissionmanagementUsecase) UpdatePermission(creatupdatePermissioneDevice *adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error) {
	ret := _m.Called(creatupdatePermissioneDevice)

	if len(ret) == 0 {
		panic("no return value specified for UpdatePermission")
	}

	var r0 adminmodels.Permissions
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) (adminmodels.Permissions, error)); ok {
		return rf(creatupdatePermissioneDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreatePermissionRequest) adminmodels.Permissions); ok {
		r0 = rf(creatupdatePermissioneDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Permissions)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreatePermissionRequest) error); ok {
		r1 = rf(creatupdatePermissioneDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewPermissionmanagementUsecase creates a new instance of PermissionmanagementUsecase. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewPermissionmanagementUsecase(t interface {
	mock.TestingT
	Cleanup(func())
}) *PermissionmanagementUsecase {
	mock := &PermissionmanagementUsecase{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}