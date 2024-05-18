output "vpc_arn" {
  description = "VPC ARN"
  value       = module.vpc.vpc_arn
}

output "vpc_public_subnets" {
  description = "VPC Public Subnets"
  value       = module.vpc.public_subnets
}

output "vpc_private_subnets" {
  description = "VPC Public Subnets"
  value       = module.vpc.private_subnets
}

output "vpc_nat_gateways" {
  description = "VPC Nat Gateways"
  value       = module.vpc.natgw_ids
}

output "vpc_igw" {
  description = "VPC Internet Gateway"
  value       = module.vpc.igw_arn
}