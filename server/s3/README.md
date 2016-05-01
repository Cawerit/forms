The project has a dedicated AWS S3 Bucket for storing static files like the survey templates.

This directory contains files that are directly related to accessing and using that bucket.
More info on S3 service can be found at https://aws.amazon.com/s3/

#### Object keys
The bucket can be used for storing many types of files, but the current database design only
guarantees unique identifiers in a single data type. Thus it is necessary to separate their *object keys*
with unique prefixes to avoid ambiguous file key resolution. **Always** prefix the object keys with
one of the prefixes in file-prefixes.json and **never** change an existing prefix in that file to
avoid data-loss. More info on S3 Object keys can be found at http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingObjects.html