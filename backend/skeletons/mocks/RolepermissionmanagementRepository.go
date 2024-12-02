// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	mock "github.com/stretchr/testify/mock"

	repo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admin"
)

// RolepermissionmanagementRepository is an autogenerated mock type for the RolepermissionmanagementRepository type
type RolepermissionmanagementRepository struct {
	mock.Mock
}

// CreateRolePermission provides a mock function with given fields: createRolepermission
func (_m *RolepermissionmanagementRepository) CreateRolePermission(createRolepermission *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createRolepermission)

	if len(ret) == 0 {
		panic("no return value specified for CreateRolePermission")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createRolepermission)
	}
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createRolepermission)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*repo.CreateDeviceReques) error); ok {
		r1 = rf(createRolepermission)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteRolePermissionById provides a mock function with given fields: createDevice
func (_m *RolepermissionmanagementRepository) DeleteRolePermissionById(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for DeleteRolePermissionById")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*repo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetRolePermissionByRoleId provides a mock function with given fields: getRolepermissionBy
func (_m *RolepermissionmanagementRepository) GetRolePermissionByRoleId(getRolepermissionBy *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(getRolepermissionBy)

	if len(ret) == 0 {
		panic("no return value specified for GetRolePermissionByRoleId")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(getRolepermissionBy)
	}
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(getRolepermissionBy)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*repo.CreateDeviceReques) error); ok {
		r1 = rf(getRolepermissionBy)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetRolePermissions provides a mock function with given fields: getRolepermission
func (_m *RolepermissionmanagementRepository) GetRolePermissions(getRolepermission *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(getRolepermission)

	if len(ret) == 0 {
		panic("no return value specified for GetRolePermissions")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(getRolepermission)
	}
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(getRolepermission)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*repo.CreateDeviceReques) error); ok {
		r1 = rf(getRolepermission)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateRolePermissions provides a mock function with given fields: createDevice
func (_m *RolepermissionmanagementRepository) UpdateRolePermissions(createDevice *repo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for UpdateRolePermissions")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*repo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*repo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewRolepermissionmanagementRepository creates a new instance of RolepermissionmanagementRepository. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewRolepermissionmanagementRepository(t interface {
	mock.TestingT
	Cleanup(func())
}) *RolepermissionmanagementRepository {
	mock := &RolepermissionmanagementRepository{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}