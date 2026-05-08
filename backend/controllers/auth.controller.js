let currentUser = null;

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;
        
        console.log(`Login attempt: ${email}`);

        // Simple mock authentication logic
        if (email === 'admin@leadzen.ai') {
            currentUser = {
                id: 'admin_1',
                name: 'LeadZen Admin',
                email: 'admin@leadzen.ai',
                role: 'admin',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
            };
        } else {
            currentUser = {
                id: 'user_' + Date.now(),
                name: email.split('@')[0],
                email: email,
                role: 'user',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            };
        }

        res.json({
            success: true,
            data: currentUser
        });
    },

    getCurrentUser: (req, res) => {
        // Return the current mock session user or a default admin if none
        if (!currentUser) {
             return res.json({
                success: false,
                data: null,
                error: "Not authenticated"
            });
        }
        
        res.json({
            success: true,
            data: currentUser
        });
    },

    signup: (req, res) => {
        const { name, email } = req.body;
        currentUser = {
            id: 'user_' + Date.now(),
            name: name || 'New User',
            email: email,
            role: 'user',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        res.json({
            success: true,
            data: currentUser
        });
    },

    logout: (req, res) => {
        currentUser = null;
        res.json({ success: true });
    }
};

module.exports = authController;
