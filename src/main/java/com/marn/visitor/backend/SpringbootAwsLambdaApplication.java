package com.marn.visitor.backend;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.xspec.S;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.marn.visitor.backend.repository.PersonRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@SpringBootApplication
public class SpringbootAwsLambdaApplication {


    @Bean
    public Function<APIGatewayProxyRequestEvent, Map<String,Object>> receiveRequest() {
        return (responseEvent) -> handleRequest(responseEvent);


    }

    public Map<String,Object> handleRequest(APIGatewayProxyRequestEvent input) {





        Map<String,Object> result = new HashMap<>();

        APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();

        result.put("body",input.getBody());
        result.put("headers",input.getHeaders());
        result.put("httpmethod",input.getHttpMethod());
        result.put("path",input.getPath());
        result.put("pathparameters",input.getPathParameters());
        result.put("stringparameters","Isto é parametro: "+input.getQueryStringParameters());
        result.put("context",input.getRequestContext());
        result.put("stagevariables",input.getStageVariables());

        responseEvent.setBody(result.toString());

        //order.getName().equals(requestEvent.getQueryStringParameters().get("orderName"))



        PersonRepository personRepository=new PersonRepository();


        //result.put("num_de_visitantes","Numero de visitantes: "+personRepository.getNumberOfVisits());

        if(input.getQueryStringParameters()==null)
            result.put("getQueryStringParameters","Vazio Super irritante vazio");
        else{
            String method= input.getQueryStringParameters().get("method");
            if (method.equals("getNumberOfVisits"))
                result.put("getQueryStringParameters","Numero de Visitas: "+personRepository.getNumberOfVisits());
            else if (method.equals("getVisitor"))
                result.put("getQueryStringParameters","Nome do Visitante: "+personRepository.getVisitor(
                        Integer.parseInt(input.getQueryStringParameters().get("value"))
                        )
                );
            else if (method.equals("findPersonByPersonId"))
                result.put("getQueryStringParameters","Find Person: "+input.getQueryStringParameters().get("value"));
            else if (method.equals("registerVisitor"))
                result.put("getQueryStringParameters","Register Visitor: "+personRepository.registerVisitor(
                        input.getQueryStringParameters().get("value"))
                );

        }

/*
            if (!input.getQueryStringParameters().get("getNumberOfVisits").isEmpty()) {
                result.put("stringparameters","Numero de Visitas: "+personRepository.getNumberOfVisits());
            }
            else
                result.put("stringparameters","Vazio");
*/

        return result;


    }




    public static void main(String[] args) {

        SpringApplication.run(SpringbootAwsLambdaApplication.class, args);
        /*APIGatewayProxyRequestEvent apiGatewayProxyRequestEvent= new APIGatewayProxyRequestEvent();
        Map <String,String> stringStringMap= new HashMap<>();
        stringStringMap.put("method","getNumberOfVisits");
        stringStringMap.put("value","53");
        apiGatewayProxyRequestEvent.setQueryStringParameters(stringStringMap);
       System.out.println(new SpringbootAwsLambdaApplication().handleRequest(apiGatewayProxyRequestEvent));
        */
    }

}
