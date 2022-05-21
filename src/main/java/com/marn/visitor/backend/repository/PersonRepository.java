package com.marn.visitor.backend.repository;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.marn.visitor.backend.entity.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;


public class PersonRepository {

   private DynamoDBMapper mapper=mapper();



    public static final String SERVICE_ENDPOINT = "DYNAMO_DB_SERVICE_ENDPOINT";
    public static final String REGION = "us-east-1";
    public static final String ACCESS_KEY = "DYNAMO_DB_ACCESS_KEY";
    public static final String SECRET_KEY = "DYNAMO_DB_SECRET_KEY";



    public DynamoDBMapper mapper() {
        return new DynamoDBMapper(amazonDynamoDBConfig());
    }


    private AmazonDynamoDB amazonDynamoDBConfig() {
        return AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(SERVICE_ENDPOINT, REGION))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY))).build();
    }


    //Setting an Person ID to only have an item, to reduce the size of dynamoDB
    private final String PERSON_ID="e1317c6a-2c93-4b6a-b5b5-6ff9510964e0";

    private final String PROTOCOL="http://";

    private final String DOMAIN_URL="localhost:5000";

    //

    public long getNumberOfVisits() {


        Person person=mapper.load(Person.class, PERSON_ID);
        person.setCount(person.getCount()+1);
        editPerson(person);
        return person.getCount();
    }

    public String registerVisitor(String visitorName) {


        Person person=mapper.load(Person.class, PERSON_ID);
        person.setName(visitorName);
        person.setCountRegisters(person.getCountRegisters()+1);
        editPerson(person);


        return ""+PROTOCOL+DOMAIN_URL+"/getVisitorName/"+person.getCountRegisters();
    }

    public Map<String,Object> getVisitor(int visitorRegisterCount) {

        Map<String,Object> result = new HashMap<>();

        Person person=mapper.load(Person.class, PERSON_ID);

        if(visitorRegisterCount == person.getCountRegisters()){
            result.put("visitor",person.getName());

        } else {
            result.put("visitor",null);

        }

        return result;
    }




    public Person findPersonByPersonId(String personID) {
        if(personID.equals(PERSON_ID)){
            return mapper.load(Person.class, PERSON_ID);
        } else {
            return new Person();

        }
    }

    public String deletePerson(Person person) {
        mapper.delete(person);
        return "person removed !!";
    }

    public String editPerson(Person person) {
        mapper.save(person, buildExpression(person));
        return "record updated ...";
    }

    private DynamoDBSaveExpression buildExpression(Person person) {
        DynamoDBSaveExpression dynamoDBSaveExpression = new DynamoDBSaveExpression();
        Map<String, ExpectedAttributeValue> expectedMap = new HashMap<>();
        expectedMap.put("personId", new ExpectedAttributeValue(new AttributeValue().withS(person.getPersonId())));
        dynamoDBSaveExpression.setExpected(expectedMap);
        return dynamoDBSaveExpression;
    }
}
