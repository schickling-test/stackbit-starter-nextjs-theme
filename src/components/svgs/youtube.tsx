import * as React from 'react';
import { pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';

export default function YouTube({ className, ...props }: StackbitFieldPath & { className: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...pickDataAttrs(props)}>
            <path d="M23.498 6.186c-0.283-1.041-1.083-1.846-2.101-2.131l-0.021-0.005c-1.871-0.505-9.376-0.505-9.376-0.505s-7.505 0-9.377 0.505c-1.038 0.29-1.838 1.095-2.116 2.115l-0.005 0.021c-0.502 1.884-0.502 5.814-0.502 5.814s0 3.93 0.502 5.814c0.283 1.041 1.083 1.846 2.101 2.131l0.021 0.005c1.871 0.505 9.376 0.505 9.376 0.505s7.505 0 9.377-0.505c1.039-0.29 1.839-1.095 2.117-2.115l0.005-0.021c0.501-1.884 0.501-5.814 0.501-5.814s0-3.93-0.502-5.814zM9.545 15.568v-7.136l6.273 3.568-6.273 3.568z"></path>
        </svg>
    );
}
