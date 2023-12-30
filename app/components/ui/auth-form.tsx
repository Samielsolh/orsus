import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const AuthForm: React.FC = () => {
    const supabase = createClientComponentClient();
    const [redirectTo, setRedirectTo] = useState('');

    useEffect(() => {
        // Check if window is defined (i.e., we're in the browser)
        if (typeof window !== "undefined") {
            // Construct the redirect URL using the current domain
            setRedirectTo(`${window.location.origin}/auth/callback`);
        }
    }, []);

    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            showLinks={false}
            providers={[]}
            redirectTo={redirectTo}
            appearance={{ theme: ThemeSupa }}
        />
    );
}

export default AuthForm;
