import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.700",
        color: "white"
        
      },
      
      footer: {
        backgroundColor: "white",
        color: "black"
      }
    }
    
  }
});
