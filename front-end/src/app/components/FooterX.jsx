import { Footer } from "flowbite-react/lib/cjs/index.js";

export const FooterX = () => {
  return (
    <>
      <Footer container={true}>
        <Footer.Copyright href="#" by="SocialApp" year={2022} />
        <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
};