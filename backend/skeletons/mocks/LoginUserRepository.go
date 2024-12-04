// Code generated by mockery v2.49.1. DO NOT EDIT.

package mocks

import (
	adminmodels "github.com/SolomonAHailu/one-card-system/models/adminmodels"
	mock "github.com/stretchr/testify/mock"

	userRepo "github.com/SolomonAHailu/one-card-system/skeletons/repo/user"
)

// LoginUserRepository is an autogenerated mock type for the LoginUserRepository type
type LoginUserRepository struct {
	mock.Mock
}

// Login provides a mock function with given fields: loginUser
func (_m *LoginUserRepository) Login(loginUser *userRepo.LoginUserRequest) (adminmodels.Users, error) {
	ret := _m.Called(loginUser)

	if len(ret) == 0 {
		panic("no return value specified for Login")
	}

	var r0 adminmodels.Users
	var r1 error
	if rf, ok := ret.Get(0).(func(*userRepo.LoginUserRequest) (adminmodels.Users, error)); ok {
		return rf(loginUser)
	}
	if rf, ok := ret.Get(0).(func(*userRepo.LoginUserRequest) adminmodels.Users); ok {
		r0 = rf(loginUser)
	} else {
		r0 = ret.Get(0).(adminmodels.Users)
	}

	if rf, ok := ret.Get(1).(func(*userRepo.LoginUserRequest) error); ok {
		r1 = rf(loginUser)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewLoginUserRepository creates a new instance of LoginUserRepository. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewLoginUserRepository(t interface {
	mock.TestingT
	Cleanup(func())
}) *LoginUserRepository {
	mock := &LoginUserRepository{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
