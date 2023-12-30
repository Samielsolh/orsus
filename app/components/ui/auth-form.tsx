// Add 'use client' comment for client-side rendering in Next.js
'use client';

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const AuthForm: React.FC = () => {
    const supabase = createClientComponentClient();

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            showLinks={false}
            providers={[]}
            redirectTo='http://localhost:3000/auth/callback'
            appearance={{ theme: ThemeSupa }}
        />
    );
}

export default AuthForm;
