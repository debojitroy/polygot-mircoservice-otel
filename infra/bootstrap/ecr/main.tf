resource "aws_ecr_repository" "otel" {
  name                 = "otel"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}