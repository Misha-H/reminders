import { Navbar } from '~/components';

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
      <div>
        <h1>{props.title}</h1>
      </div>
    </header>
  );
}
