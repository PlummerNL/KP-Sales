function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Background color</Text>}>
        <ColorSelect
          settingsKey="bgcolor"
          colors={[
            {color: "red"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Frame color</Text>}>
        <ColorSelect
          settingsKey="framecolor"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        />
      </Section>        
      <Section
        title={<Text bold align="center">Main dial color</Text>}>
        <ColorSelect
          settingsKey="dialcolor"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        />
      </Section>  

      <Section
        title={<Text bold align="center">Hour hand color</Text>}>      
        <ColorSelect
          settingsKey="colorhour"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        />  
      </Section>
     <Section
        title={<Text bold align="center">Minute hand color</Text>}>  
        <ColorSelect
          settingsKey="colorminute"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        /> 
     </Section> 
     <Section
        title={<Text bold align="center">Second hand color</Text>}>  
        <ColorSelect
          settingsKey="colorsecond"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        /> 
     </Section>  
     <Section
        title={<Text bold align="center">Generic text color</Text>}>  
        <ColorSelect
          settingsKey="colordate"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        /> 
     </Section> 
     <Section
        title={<Text bold align="center">KPay labels color</Text>}>  
        <ColorSelect
          settingsKey="colorkpl"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        /> 
     </Section>  
     <Section
        title={<Text bold align="center">KPay data color</Text>}>  
        <ColorSelect
          settingsKey="colorkpd"
          colors={[
            {color: "#F83C40"},
            {color: "green"},
            {color: "yellow"},
            {color: "blue"},
            {color: "#00BFFF"},
            {color: "#DA70D6"},
            {color: "#FF69B4"},
            {color: "#FFA500"},
            {color: "#FF00FF"},
            {color: "#7FFF00"},
            {color: "white"},
            {color: "#00FFFF"},
            {color: "black"}
          ]}
        /> 
     </Section>       
      <Section     
        title={<Text bold align="center">K-Pay settings</Text>}> 
        <TextInput
          label="Your API key"
          settingsKey="apikey"
          type="text"
        />
      </Section>
      <Section
        title={<Text bold align="center">Weather and city display</Text>}>      
        <Toggle
          settingsKey="showweather"
          label="Show weather"
        />       
      </Section>      
    </Page>
  );
}

registerSettingsPage(mySettings);
