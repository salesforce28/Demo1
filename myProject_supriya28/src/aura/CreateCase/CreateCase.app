<aura:component controller="CreateCaseApexController" implements="force:hasRecordId,flexipage:availableForAllPageTypes" access="global">
    <aura:attribute type="Case" name="newCase" default="{ 'sobjectType': 'Case' }" />
    <aura:attribute name="contact" type="Contact"/>
    <aura:attribute name="recordId" type="Id" />
    <aura:attribute name="hasErrors" type="Boolean" />
    <aura:attribute name="message" type="String" />

    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />

    <div class="slds-page-header" role="banner">
        <p class="slds-text-heading--label">{!v.contact.Name}</p>
        <h1 class="slds-page-header__title slds-m-right--small
            slds-truncate slds-align-left">Create New Case</h1>
    </div>
    
    <aura:if isTrue="{!v.hasErrors}">
        <div class="recordSaveError">
            <ui:message title="Error" severity="error" closable="true">
                An error was encountered trying to save this case.
                Please review and correct any errors before submitting.
            </ui:message>
        </div>
    </aura:if>
    
    <aura:if isTrue="{!not(empty(v.message))}">
        <div class="recordSaveSuccess">
            <ui:message >
                {!v.message}
            </ui:message>
        </div>
    </aura:if>


    <div class="slds-form--stacked">
		<div class="slds-form-element">
            <label class="slds-form-element__label" for="Subject">Subject: </label>
            <div class="slds-form-element__control">
              <ui:inputText class="slds-input" aura:id="Subject"
                value="{!v.newCase.Subject}" required="true"/>
            </div>
        </div>
    	<div class="slds-form-element">
            <label class="slds-form-element__label" for="EngineeringReqNumber">Engineering Request Number: </label>
            <div class="slds-form-element__control">
              <ui:inputText class="slds-input" aura:id="EngineeringReqNumber"
                value="{!v.newCase.EngineeringReqNumber__c}" required="true"/>
            </div>
        </div>
		<div class="slds-form-element">
            <label class="slds-form-element__label" for="Subject">Description: </label>
            <div class="slds-form-element__control">
              <ui:inputTextArea class="slds-input" aura:id="Description"
                value="{!v.newCase.Description}" required="true" />
            </div>
        </div>
    	<div class="slds-form-element">
            <ui:button label="Save Case" press="{!c.saveCase}"
                class="slds-button slds-button--brand" />
        </div>
    </div>
</aura:component>