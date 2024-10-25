package request

type UpdateRolesRequest struct {
	Id          int    `validate:"required"`
	Name        string `validate:"required,max=200,min=1" json:"name"`
	Description string `validate:"required,max=200,min=1" json:"description"`
}

type UpdatePermissionsRequest struct {
	Id          int    `validate:"required"`
	Name        string `validate:"required,max=200,min=1" json:"name"`
	Description string `validate:"required,max=200,min=1" json:"description"`
}
