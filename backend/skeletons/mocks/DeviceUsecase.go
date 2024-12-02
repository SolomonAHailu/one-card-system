// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	adminRepo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admin"

	mock "github.com/stretchr/testify/mock"
)

// DeviceUsecase is an autogenerated mock type for the DeviceUsecase type
type DeviceUsecase struct {
	mock.Mock
}

// CreatedDevice provides a mock function with given fields: createDevice
func (_m *DeviceUsecase) CreatedDevice(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for CreatedDevice")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteDeviceById provides a mock function with given fields: createDevice
func (_m *DeviceUsecase) DeleteDeviceById(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for DeleteDeviceById")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetAllDevices provides a mock function with given fields: createDevice
func (_m *DeviceUsecase) GetAllDevices(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for GetAllDevices")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetDeviceById provides a mock function with given fields: createDevice
func (_m *DeviceUsecase) GetDeviceById(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for GetDeviceById")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateDeviceById provides a mock function with given fields: createDevice
func (_m *DeviceUsecase) UpdateDeviceById(createDevice *adminRepo.CreateDeviceReques) (adminmodels.Devices, error) {
	ret := _m.Called(createDevice)

	if len(ret) == 0 {
		panic("no return value specified for UpdateDeviceById")
	}

	var r0 adminmodels.Devices
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) (adminmodels.Devices, error)); ok {
		return rf(createDevice)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateDeviceReques) adminmodels.Devices); ok {
		r0 = rf(createDevice)
	} else {
		r0 = ret.Get(0).(adminmodels.Devices)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateDeviceReques) error); ok {
		r1 = rf(createDevice)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewDeviceUsecase creates a new instance of DeviceUsecase. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewDeviceUsecase(t interface {
	mock.TestingT
	Cleanup(func())
}) *DeviceUsecase {
	mock := &DeviceUsecase{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
