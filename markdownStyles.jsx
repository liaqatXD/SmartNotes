import { StyleSheet } from "react-native";

 const lightMarkdownStyles=StyleSheet.create({
    body:{
        color:"black",
        fontFamily:"Poppins-Regular",
        fontSize:18

    },
    paragraph: {
      marginTop:0,
      marginBottom: 5,
    },

    heading1:{
     fontFamily:"Poppins-Bold",
     fontSize:30

    },
    heading2:{
        fontFamily:"Poppins-Bold",
        fontSize:28
       },
     heading3:{
        fontFamily:"Poppins-Bold",
        fontSize:25
       },
       heading4:{
        fontFamily:"Poppins-Bold",
        fontSize:22

       },
       heading5:{
        fontFamily:"Poppins-Bold",
        fontSize:20
       },
       heading6:{
        fontFamily:"Poppins-Bold",
        fontSize:18
       },
       hr:{
        backgroundColor:"black"
       },
       code_inline: {
        borderWidth: 1,
        backgroundColor: 'purple',
        color:"white",
        padding: 5,
        borderRadius: 10,
        fontFamily:'Poppins-Light',
        marginBottom:10
       },
    
       blockquote: {
        backgroundColor: '#272727',
        borderColor: 'purple',
        color:"white",
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 5,
      },
 });
 const darkMarkdownStyles=StyleSheet.create({
    body:{
        color:"white",
        fontFamily:"Poppins-Regular",
        fontSize:18

    },
    paragraph: {
      marginTop:0,
      marginBottom: 5,
    },

    heading1:{
     fontFamily:"Poppins-Bold",
     fontSize:30

    },
    heading2:{
        fontFamily:"Poppins-Bold",
        fontSize:28,
       },
     heading3:{
        fontFamily:"Poppins-Bold",
        fontSize:25
       },
       heading4:{
        fontFamily:"Poppins-Bold",
        fontSize:22

       },
       heading5:{
        fontFamily:"Poppins-Bold",
        fontSize:20
       },
       heading6:{
        fontFamily:"Poppins-Bold",
        fontSize:18
       },
       hr:{
        backgroundColor:"white"
       },
       code_inline: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'purple',
        padding: 5,
        borderRadius: 10,
        fontFamily:'Poppins-Light',
        marginBottom:10
       },
    
       blockquote: {
        backgroundColor: '#2d2a2e',
        borderColor: 'purple',
        borderLeftWidth: 4,
        marginLeft: 5,
        paddingHorizontal: 5,
      },
  });


const themes= {
    lightTheme:lightMarkdownStyles,
    darkTheme:darkMarkdownStyles

 };
 export default themes;