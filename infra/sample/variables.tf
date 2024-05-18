variable "terraform_state_bucket" {
  type = string
  description = "S3 Bucket where the state is stored"
}

variable "bootstrap_state_key" {
  type = string
  description = "Object Key for Bootstrap output"
}