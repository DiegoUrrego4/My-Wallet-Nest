# Diagramación End Points

## Register:

<span style="color:orange">[POST]</span> <span style="font-size:1.2em;">
/api/v1/client/signup ✅
</span>

```
request {
	full_name: "Diego Urrego",
	email: "diego.urrego@sofka.com.co",
	phone: "322 123 1234",
	photo: "https://gravatar.com.co"
}
response [201] {
	token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjhXblpUZDlMU3EzMDBnRHc4am5EcSJ9.eyJnaXZlbl9uYW1lIjoiRGllZ28iLCJmYW1pbHlfbmFtZSI6IlVycmVnbyBHYW1ib2EiLCJuaWNrbmFtZSI6ImRpZWdvLnVycmVnbyIsIm5hbWUiOiJEaWVnbyBVcnJlZ28gR2FtYm9hIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTJaT3BaNkxoVzQybUlVbkhTTGZ3UkxxWGItbGF6THV3NDZjbHVkPXM5Ni1jIiwibG9jYWxlIjoiZXMiLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yN1QwNTo1OTozOC41MThaIiwiZW1haWwiOiJkaWVnby51cnJlZ29Ac29ma2EuY29tLmNvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LWdzeml3a2ZqdTdvcDY2Z3oudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE4NDQzNzg2NzI5OTU1ODY2NTA2IiwiYXVkIjoibjdwcFEyVVFsWWxWN202WHJLeU80Rnk4R2FwR3dHVk8iLCJpYXQiOjE2Njk2ODU3NDYsImV4cCI6MTY2OTcyMTc0Niwic2lkIjoiM1Bod2RpTjhTcnJFcE1iejgtU2o5YTRRYXBTNkRfMjYifQ.ctuFW0zmpfBYdsEQ1bdBAdT8FajivNBBNqElhXl7GKKW6eqc3b_nJxaDcR7_dyxMvJhB-C7Rb1SAKSDKDiXbXDwhNjRtQclrdvLUmJ556nnoHbt_1H8BNXBezxN_jCOvJWthES71mZtL3NQjs4nCVVIF_OnIrPHh303Xp9pO6UdadSlsCb8Le-EmUl48rIdKJpgpt_4JxuM_81MlJEX4ix3oljLqN3adu_3BRZvzf1nfibPR-BWTYKsOqMpJ68lpACUC5LPKr7wMRUkf4QuV5OoIboDGT-8vukfoSmFL6P8UeIS6NKMOS8yDJvktD477I6RAHqq4kMoCH8m3wEkTtw"
}
```

<table>
	<tr>
		<th>Middleware</th>
		<th>Guards</th>
		<th>Interceptors</th>
		<th>Pipes</th>
		<th>Controller</th>
		<th>Action</th>
		<th>Services</th>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>ClientController</td>
		<td>signup(newUserData: UserCreateDTO)</td>
		<td>ClientService / createClient(newUserData: ClientEntity)</td>
	</tr>
</table>

## Individual Movements

<span style="color:green">[GET]</span> <span style="font-size:1.2em;">
/api/v1/movements/movement/:movementId
</span>

```
  Params: {
  movementId: '5b474486-367c-413d-b306-2c09fc7eb090'
  }

response [200] {
movements: [
	{
		movementId: '5b474486-367c-413d-b306-2c09fc7eb090',
		movementAccountPhoto: 'https://gravatar.com.co',
		typeOfMovement: 'Income',
		movementReason: 'Pago salario',
		movementAmount: 3500000,
		movementDatetime: '2022-11-29 12:35:43',
	},
	{
		movementId: 'db37a4f7-29db-4669-b3ee-ed56ce855736',
		movementAccountPhoto: 'https://gravatar.com.co',
		typeOfMovement: 'Outcome',
		movementReason: 'Pago cuota Netflix',
		movementAmount: 15000,
		movementDatetime: '2022-11-29 12:35:43',
	},
	{
		movementId: '61123c16-9267-4ffc-9e41-3b8612fc4827',
		movementAccountPhoto: 'https://gravatar.com.co',
		typeOfMovement: 'Income',
		movementReason: 'Compra en Jumbo',
		movementAmount: 342520,
		movementDatetime: '2022-11-29 12:35:43',
	},
]
}
```

<table>
	<tr>
		<th>Middleware</th>
		<th>Guards</th>
		<th>Interceptors</th>
		<th>Pipes</th>
		<th>Controller</th>
		<th>Action</th>
		<th>Services</th>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>findMovements(@Params('clientId): id)</td>
		<td>MovementService / findUserMovements(clientId: MovementEntity)</td>
	</tr>
</table>

## Loans:

<span style="color:green">[GET]</span> <span style="font-size:1.2em;">
/api/v1/movements/loans
</span>

```
request: {
	AccountId: '89b40934-3e4a-449e-ac71-88d2f78b12ad'
}

response [200] {
availableCapacity: 49000000
}
```

<span style="color:orange">[POST]</span> <span style="font-size:1.2em;">
/api/v1/movements/loans
</span>

```
  request: {
  loanReason: 'Prestamo fin de mes',
  loanAmount: 1000000,
  }

response [201] {
availableCapacity: 49000000
}
```

<table>
	<tr>
		<th>Middleware</th>
		<th>Guards</th>
		<th>Interceptors</th>
		<th>Pipes</th>
		<th>Controller</th>
		<th>Action</th>
		<th>Services</th>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>findLoanCappacity(@Params('clientId): id)</td>
		<td>MovementService / findUserAccountBalance(clientId: MovementEntity)</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>saveMovement(@Params('clientId): id, @Body{})</td>
		<td>MovementService / createMovement(clientId: MovementEntity)</td>
	</tr>
</table>

## Payment:

<span style="color:green">[GET]</span> <span style="font-size:1.2em;">
/api/v1/movements/payment/:term
</span>

```
Params: {
  term: 'userMail@mail.com' | '322 123 1234'
}
response [200] {
	exist: true
}
```

<span style="color:green">[GET]</span> <span style="font-size:1.2em;">
/api/v1/movements/payment
</span>

```
request: {
	AccountId: '89b40934-3e4a-449e-ac71-88d2f78b12ad'
}

response [200] {
accountBalance: 140234543
}
```

<span style="color:orange">[POST]</span> <span style="font-size:1.2em;">
/api/v1/movements/payment
</span>

```
  request: {
  paymentAmount: 100000,
  paymentReason: 'Segunda cuota prestamo',
  }

response [201] {
	movementId: '89b40934-3e4a-449e-ac71-88d2f78b12ad'
	movementReason: 'Segunda cuota prestamo',
	movementAmount: 100000,
	movementDatetime: '2022-11-29 12:35:43',
}
```

<table>
	<tr>
		<th>Middleware</th>
		<th>Guards</th>
		<th>Interceptors</th>
		<th>Pipes</th>
		<th>Controller</th>
		<th>Action</th>
		<th>Services</th>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>findBalanceAccount(@Params('clientId): id)</td>
		<td>MovementService / findUserAccountBalance(clientId: MovementEntity)</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>saveMovement(@Params('clientId): id, @Body{})</td>
		<td>MovementService / createMovement(clientId: MovementEntity)</td>
	</tr>
</table>

## Change App Theme

<span style="color:yellow">[GET]</span> <span style="font-size:1.2em;">
/api/v1/app/theme
</span>

```
 Params: {
  clientId: '89b40934-3e4a-449e-ac71-88d2f78b12ad''
}

response [200] {
	appColor: 'purple'
}
```

<span style="color:yellow">[PATCH]</span> <span style="font-size:1.2em;">
/api/v1/app/theme
</span>

```
 request: {
  clientId: '89b40934-3e4a-449e-ac71-88d2f78b12ad'
  newColorTheme: 'purple'
}

response [200] {
	newColorTheme: 'purple'
  	changed: true
}
```

<table>
	<tr>
		<th>Middleware</th>
		<th>Guards</th>
		<th>Interceptors</th>
		<th>Pipes</th>
		<th>Controller</th>
		<th>Action</th>
		<th>Services</th>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>AppController</td>
		<td>changeAppTheme(@Params('newAppColor): newAppColor)</td>
		<td>AppService / changeAppTheme(app: AppEntity)</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td>ValidationPipe / class-validator [DTO]</td>
		<td>MovementController</td>
		<td>findColor(@Params('clientId): id})</td>
		<td>MovementService / getAppColor(clientId: ClientEntity)</td>
	</tr>
</table>
