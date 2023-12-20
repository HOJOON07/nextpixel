import Separator from "@/components/atoms/Separator";
import Box from "@/components/layout/Box";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      <main></main>
      <Separator></Separator>
      <Box padding={3}></Box>
      <Footer></Footer>
    </>
  );
};

export default Layout;
