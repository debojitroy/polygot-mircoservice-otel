terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
  }
}

data "terraform_remote_state" "bootstrap" {
  backend = "s3"
  config = {
    bucket=var.terraform_state_bucket
    key=var.bootstrap_state_key
  }
}

resource "aws_security_group" "sample_sg" {
  name        = "allow_tls"
  description = "Allow TLS inbound traffic and all outbound traffic"
  vpc_id      = data.terraform_remote_state.bootstrap.outputs.vpc_id

  tags = {
    Name = "allow_tls"
  }
}