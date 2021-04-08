import Header from "./Header";

function Layout(props: any) {
  return (
    <div>
      <Header history={props.history} />
      {/* <Sidebar history={props.history}/> */}
    </div>
  );
}
export default Layout;
