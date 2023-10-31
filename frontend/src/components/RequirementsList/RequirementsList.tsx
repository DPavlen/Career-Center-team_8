import { v4 as uuid } from 'uuid';

function RequirementsList({ data, ordered = false }: { data: string, ordered?: boolean }) {
  const array = data.split('\n').map((x) => x.trim()).filter((x) => Boolean(x));

  return (
    array && (
      array.map((item: string) => (
        <li key={uuid()}>
          {`${ordered ? '' : '-'} ${item}`}
        </li>
      ))
    )
  );
}

export default RequirementsList;
