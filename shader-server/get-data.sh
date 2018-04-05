#!/bin/bash
mkdir -p census.parq
cd census.parq
wget http://bcollins-outbox.s3.amazonaws.com/census/_common_metadata
wget http://bcollins-outbox.s3.amazonaws.com/census/_metadata
wget http://bcollins-outbox.s3.amazonaws.com/census/part.0.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.1.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.2.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.3.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.4.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.5.parquet
wget http://bcollins-outbox.s3.amazonaws.com/census/part.6.parquet
cd -
