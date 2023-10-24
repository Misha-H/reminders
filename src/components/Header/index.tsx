import { Navbar } from '..';

interface HeaderProps {
  /**
   * Page title (`<h1>`)
   */
  title: string;
}

export default function (props: HeaderProps) {
  return (
    <header>
      <Navbar />
      <h1>{props.title}</h1>
    </header>
  );
}
