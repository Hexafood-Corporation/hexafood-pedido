#!/bin/bash
aws sqs create-queue --endpoint-url http://localhost:4566 --queue-name novo_pedido --region us-east-1