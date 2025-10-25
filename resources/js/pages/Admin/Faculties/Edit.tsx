import { Faculty } from '@/types/Faculty';
import FacultyForm from './FacultyForm';

interface Props {
    faculty: Faculty;
}

export default function Edit({ faculty }: Props) {
    return (
        <FacultyForm faculty={faculty} />

    );
}
