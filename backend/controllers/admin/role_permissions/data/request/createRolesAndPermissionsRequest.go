package request

type CreateRolesRequest struct {
	Name        string `validate:"required,min=1,max=200" json:"name"`
	Description string `validate:"required,min=1,max=200" json:"description"`
}

type CreatePermissionsRequest struct {
	Name        string `validate:"required,min=1,max=200" json:"name"`
	Description string `validate:"required,min=1,max=200" json:"description"`
}
