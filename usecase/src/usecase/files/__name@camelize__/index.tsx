import React  from "react";

<% if(appData) { %>
const <%= classify(name) %>: React.FC<{
  data: {};}> = ({ data }: { data: { } }) => {
  

  return <></>;
};
<% } else { %>
  const <%= classify(name) %>: React.FC = () => {
  

  return <></>;
};
<% } %>



export default <%= classify(name) %>;
