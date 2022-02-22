<h1 align="center" >  Contabil </h1>
<h2>API Gerência de despesas e receitas </h2>

Formato do JSON: 			
<hr>

{ 

	"date": "YYYY-MM-DD", 	
	"value": 999.99, 	
	"title": "1", 	
	"description": "Descrição do rubrica do lançamento", 	
	"opcode": boolean (false ou true) 	
	
} 

	Descrição dos campos: 
		date - Data do lançamento. 
		value - Valor do lançamento. 
		title - Classificação do lançamento. 
		description - Descrição da rubrica do lançamento ou observação sobre o mesmo. 
		opcode - 0:despesa 1:receita


<p> <strong> Operações com a API </strong> </p>
<hr/>

<p> <strong> AddRegistroContabilidade </strong> <br>	
	Descricão: Adicionar registro de despesa ou receita <br>
	POST http://localhost:3000/cont/add <br>
	Resultado: Adiciona registros através de POST, abaixo o formato do JSON para a operação: <br>
	{ <br>
	"date": "YYYY-MM-DD", <br>
	"value": 999.99, <br>
	"title": "1", <br>
	"description": "Descrição do rubrica do lançamento", <br>
	"opcode": boolean (false ou true) <br>
	}
	</p>

<p> <strong> ShowRegistros </strong> <br>
	GET http://localhost:3000/cont/show <br>
	Resultado: Mostra todos os registros cadastrados, tanto de despesas como receitas. </p>

<p> ShowOp <br>
	GET http://localhost:3000/cont/showop/:opcode <br>
	Parâmetro na URI {opcode} 0:Despesas 1:Receitas <br>
	Resultado: Mostra todos os registros cadastrados de despesas ou de receitas, conforme opcode 0 ou 1, respectivamente. <br>
	Exemplo: ShowOp - Despesas: <br>  http://localhost:3000/cont/showop/0 <br>
	Exemplo: ShowOp - Receitas: <br>  http://localhost:3000/cont/showop/1 <br> </p>
			
<p> <strong> ReportRev </strong> <br>
	GET http://localhost:3000/cont/reportRev  <br>
	Resultado: Valor da média de todos as receitas registradas. </p>

<p> <strong> ReportExp </strong> <br>
	GET http://localhost:3000/cont/reportExp <br>
	Resultado: Valor médio de todas as despesas registradas. </p>

<p> <strong> Remove </strong> <br>
	POST http://localhost:3000/cont/remove <br>
	Parâmetro JSON: { "_id": "código do registro do mongoDB" } <br>
	Resultado: Remoção do documento contido no _id do JSON. Caso não exista o código _id informado ou seja nulo recebe resposta informativa.

<p> <strong> Update </strong> <br>
	POST http://localhost:3000/cont/update <br>
	Exemplo Parâmetro JSON: <br>
	{ <br>
	"_id": "CÓDIGO DO REGISTRO DO MONGODB", <br>
	"date": "2021-10-13T00:00:00.000Z", <br>
	"value": 100.00, <br>
	"title": "1", <br>
	"description": "Teste do update", <br>
	"opcode": true <br>
	} <br>
	Observações:  <br>
	1. A propriedade _id é obrigatório e a referência para a atualização do registro. <br>
	2. As demais propriedade date, value, title, description ou opcode seguem o formato demonstrado no exemplo acima. <br>
	a. Podem ser alteradas para os valores, dados necessários, de acordo como os seus formatos. <br>

Resultado: O código _id precisa ser válido, caso inválido recebe mensagem de orientação. Sendo o código _id válido e havendo a declaração dos demais campos, receberá a mensagem de confirmação de atualização do documento. </p>

<p>  <strong> MonthReport </strong> - Relatório Mensal <br>
	GET http://localhost:3000/cont/:month/:year/:opcode  <br>
	:month - Mês para a extração do relatório. <br>
	:year - Ano para a extração do relatório. <br>
	:opcode - 0 para relatório de despesas, 1 para relatório de receitas. <br>

Exemplo: http://localhost:3000/cont/monthReport/10/2021/0 <br>
	Extração do relatório do mês 10 do ano 2021 despesas (opcode 0).
<br>
Exemplo do JSON de resposta: 
<br>
{ <br>
"histórico_despesas": [ <br>
    { <br>
        "_id": "62143383e0911a08d38255ce", <br>
        "date": "2021-10-30T00:00:00.000Z", <br>
        "value": 30, <br>
        "title": "1", <br>
        "description": "Tratamento de data", <br>
        "opcode": false, <br>
        "__v": 0 <br>
    }, <br>
    { <br> 
        "_id": "6214d8821fc54c0ee3efcf78", <br>
        "date": "2021-10-01T00:00:00.000Z", <br>
        "value": 30, <br>
        "title": "1", <br>
        "description": "Filtro de período de datas.", <br>
        "opcode": false, <br>
        "__v": 0 <br>
    } <br>
], <br>
"despesas": "DESPESAS 10/2021 : R$ 60" <br>


Em caso de código de operação inválida é enviada mensagem de orientação. <br> </p>

<p> <strong> Balanço Mensal </strong> <br>
	GET http://localhosta:3000/cont/:month/:year  <br>
	:month - Mês para a extração do relatório.  <br>
	:year - Ano para a extração do relatório. <br>

Exemplo: http://localhost:3000/cont/balance/10/2021 Extração do relatório do mês 10 do ano de 2021
<br>
Exemplo do JSON de resposta: <br>

     { <br>
       "despesas": "DESPESAS 10/2021 : R$ 60", <br>
       "receitas": "RECEITAS 10/2021 : R$ 61", <br>
       "resultado": 1 <br>
     } <br>
