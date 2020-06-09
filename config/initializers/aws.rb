Aws.config.update({
  region: ENV["aws_region"],
  credentials: Aws::Credentials.new(ENV['aws_access_key_id'], ENV['aws_secret_access_key']),
})