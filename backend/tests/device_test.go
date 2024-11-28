package usecases_test
import (
	"testing"
	"github.com/SolomonAHailu/one-card-system/models/adminmodels"
	"github.com/SolomonAHailu/one-card-system/skleton/mock"
	"github.com/SolomonAHailu/one-card-system/skleton/repositories"
	"github.com/SolomonAHailu/one-card-system/skleton/usecases"
	"github.com/stretchr/testify/assert"
)
func TestGetAllDevices(t *testing.T) {
	mock := mock.NewGetAllDevicesUsecase(t)
	
	
	getAllDevices := &repositories.GetAllDeviceRequest{}
	
	mock.On("GetAllDevices", getAllDevices).Return([]adminmodels.Devices{}, nil)
	
	usecase := usecases.NewGetAllDevicesUsecase(mock)
	
	result, err := usecase.GetAllDevices(getAllDevices)
	
	assert.NoError(t, err)
	assert.NotNil(t, result)
}
