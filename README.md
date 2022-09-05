# projeto18-valex

# Rotas de criação e gerenciamento de cartões:

## Rota <span style="color:yellow"> **POST** </span>/createCard

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é criar novos cartões para os funcionários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "employeeId": "id_do_funcionario", //number
  "type": "tipo_do_cartão" //string
}
```

## Rota <span style="color:orange"> **POST** </span>/activateCard
(Não autenticada)

Sua função é ativar os cartões criados.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "id": "id_do_cartão", //number
  "securityCode": "cvc_do_cartao", //string
  "password": "senha_escolhida" //string
}
```

## Rota <span style="color:green"> **GET** </span>/consultCard/:id
(Não autenticada)

A função dessa rota é verificar o extrato dos cartões. 

O "id" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```json
"balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
```

## Rotas <span style="color:orange"> **PUT** </span>/blockCard/:id e /unblockCard/:id
(Não autenticada)

Rota que permiti ao usuário bloquear e desbloquear um cartão.

O "id" passado na rota é o id do cartão criado.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "password": "senha_do_cartão" //string
}
```

# Rotas de compra e recarga:

## Rota <span style="color:yellow"> **POST** </span>/rechargeCard/:id

Essa é uma rota autenticada com um header http do tipo "x-api-key". Sua função é recarregar os cartões para os funcionários.

O "id" passado na rota é o id do cartão.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "amount": "valor_da_recarga" //number
}
```

## Rota <span style="color:yellow"> **POST** </span>/payment/:id

Essa é uma rota não autenticada.

Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

O "id" passado na rota é o id do estabelecimento

```json
{
  "cardId": "id_do_cartão", //number
  "password": "senha_do_cartão", //string
  "amount": "valor_da_compra" //number
}
```
