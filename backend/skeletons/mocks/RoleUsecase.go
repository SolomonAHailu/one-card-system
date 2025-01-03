// Code generated by mockery v2.46.3. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	adminRepo "github.com/SolomonAHailu/one-card-system/skeletons/repo/admincontrollers"

	mock "github.com/stretchr/testify/mock"
)

// RoleUsecase is an autogenerated mock type for the RoleUsecase type
type RoleUsecase struct {
	mock.Mock
}

// CreatedRole provides a mock function with given fields: createRole
func (_m *RoleUsecase) CreatedRole(createRole *adminRepo.CreateRoleRequest) (adminmodels.Roles, error) {
	ret := _m.Called(createRole)

	if len(ret) == 0 {
		panic("no return value specified for CreatedRole")
	}

	var r0 adminmodels.Roles
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) (adminmodels.Roles, error)); ok {
		return rf(createRole)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) adminmodels.Roles); ok {
		r0 = rf(createRole)
	} else {
		r0 = ret.Get(0).(adminmodels.Roles)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateRoleRequest) error); ok {
		r1 = rf(createRole)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteRole provides a mock function with given fields: createRole
func (_m *RoleUsecase) DeleteRole(createRole *adminRepo.CreateRoleRequest) (adminmodels.Roles, error) {
	ret := _m.Called(createRole)

	if len(ret) == 0 {
		panic("no return value specified for DeleteRole")
	}

	var r0 adminmodels.Roles
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) (adminmodels.Roles, error)); ok {
		return rf(createRole)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) adminmodels.Roles); ok {
		r0 = rf(createRole)
	} else {
		r0 = ret.Get(0).(adminmodels.Roles)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateRoleRequest) error); ok {
		r1 = rf(createRole)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetRole provides a mock function with given fields: createRole
func (_m *RoleUsecase) GetRole(createRole *adminRepo.CreateRoleRequest) (adminmodels.Roles, error) {
	ret := _m.Called(createRole)

	if len(ret) == 0 {
		panic("no return value specified for GetRole")
	}

	var r0 adminmodels.Roles
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) (adminmodels.Roles, error)); ok {
		return rf(createRole)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) adminmodels.Roles); ok {
		r0 = rf(createRole)
	} else {
		r0 = ret.Get(0).(adminmodels.Roles)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateRoleRequest) error); ok {
		r1 = rf(createRole)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetRoles provides a mock function with given fields: createRole
func (_m *RoleUsecase) GetRoles(createRole *adminRepo.CreateRoleRequest) (adminmodels.Roles, error) {
	ret := _m.Called(createRole)

	if len(ret) == 0 {
		panic("no return value specified for GetRoles")
	}

	var r0 adminmodels.Roles
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) (adminmodels.Roles, error)); ok {
		return rf(createRole)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) adminmodels.Roles); ok {
		r0 = rf(createRole)
	} else {
		r0 = ret.Get(0).(adminmodels.Roles)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateRoleRequest) error); ok {
		r1 = rf(createRole)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateRole provides a mock function with given fields: createRole
func (_m *RoleUsecase) UpdateRole(createRole *adminRepo.CreateRoleRequest) (adminmodels.Roles, error) {
	ret := _m.Called(createRole)

	if len(ret) == 0 {
		panic("no return value specified for UpdateRole")
	}

	var r0 adminmodels.Roles
	var r1 error
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) (adminmodels.Roles, error)); ok {
		return rf(createRole)
	}
	if rf, ok := ret.Get(0).(func(*adminRepo.CreateRoleRequest) adminmodels.Roles); ok {
		r0 = rf(createRole)
	} else {
		r0 = ret.Get(0).(adminmodels.Roles)
	}

	if rf, ok := ret.Get(1).(func(*adminRepo.CreateRoleRequest) error); ok {
		r1 = rf(createRole)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewRoleUsecase creates a new instance of RoleUsecase. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewRoleUsecase(t interface {
	mock.TestingT
	Cleanup(func())
}) *RoleUsecase {
	mock := &RoleUsecase{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
