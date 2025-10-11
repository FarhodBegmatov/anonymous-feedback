import { Faculty } from '@/types/Faculty';
import Form from './Form';

interface Props {
    faculty: Faculty;
}

export default function Edit({ faculty }: Props) {
    return (
        <Form faculty={faculty} />

    );
}
