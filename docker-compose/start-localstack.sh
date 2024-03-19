#!/bin/bash
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name novo_pedido --region us-east-1
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name pagamento_processado --region us-east-1
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name pedido_recebido --region us-east-1

API_NAME=hexafood-pedidos
REGION=us-east-1
STAGE=dev

# # Cria API Gateway

# awslocal apigateway create-rest-api \
#     --region ${REGION} \
#     --name ${API_NAME}

# API_ID=$(awslocal apigateway get-rest-apis --query "items[?name==\`${API_NAME}\`].{ID: id}" --output text --region ${REGION})
# PARENT_RESOURCE_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/`].{ID: id}' --output text --region ${REGION})

# # Recurso Pedidos 

# awslocal apigateway create-resource \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --parent-id ${PARENT_RESOURCE_ID} \
#     --path-part "pedidos"

# RESOURCE_PEDIDO_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/pedidos`].{ID: id}' --output text --region ${REGION})

# awslocal apigateway put-method \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_PEDIDO_ID} \
#     --http-method ANY \
#     --authorization-type "NONE" \

# awslocal apigateway put-integration \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_PEDIDO_ID} \
#     --http-method ANY \
#     --type HTTP \
#     --integration-http-method ANY \
#     --uri http://api-pedido:3000/pedidos \


# # Recurso Clientes 

# awslocal apigateway create-resource \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --parent-id ${PARENT_RESOURCE_ID} \
#     --path-part "clientes"

# RESOURCE_CLIENTES_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/clientes`].{ID: id}' --output text --region ${REGION})

# awslocal apigateway put-method \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_CLIENTES_ID} \
#     --http-method ANY \
#     --authorization-type "NONE" \

# awslocal apigateway put-integration \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_CLIENTES_ID} \
#     --http-method ANY \
#     --type HTTP \
#     --integration-http-method ANY \
#     --uri http://api-pedido:3000/clientes \


# # Recurso Categorias 

# awslocal apigateway create-resource \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --parent-id ${PARENT_RESOURCE_ID} \
#     --path-part "categorias"

# RESOURCE_CATEGORIAS_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/categorias`].{ID: id}' --output text --region ${REGION})

# awslocal apigateway put-method \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_CATEGORIAS_ID} \
#     --http-method ANY \
#     --authorization-type "NONE" \

# awslocal apigateway put-integration \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_CATEGORIAS_ID} \
#     --http-method ANY \
#     --type HTTP \
#     --integration-http-method ANY \
#     --uri http://api-pedido:3000/categorias \



# # Recurso Produtos 

# awslocal apigateway create-resource \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --parent-id ${PARENT_RESOURCE_ID} \
#     --path-part "produtos"

# RESOURCE_PRODUTOS_ID=$(awslocal apigateway get-resources --rest-api-id ${API_ID} --query 'items[?path==`/produtos`].{ID: id}' --output text --region ${REGION})

# awslocal apigateway put-method \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_PRODUTOS_ID} \
#     --http-method ANY \
#     --authorization-type "NONE" \

# awslocal apigateway put-integration \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --resource-id ${RESOURCE_PRODUTOS_ID} \
#     --http-method ANY \
#     --type HTTP \
#     --integration-http-method ANY \
#     --uri http://api-pedido:3000/produtos \


# awslocal apigateway create-deployment \
#     --region ${REGION} \
#     --rest-api-id ${API_ID} \
#     --stage-name ${STAGE} \

# ENDPOINT=http://localhost:4566/restapis/${API_ID}/${STAGE}/_user_request_/

# echo "API available at: ${ENDPOINT}"