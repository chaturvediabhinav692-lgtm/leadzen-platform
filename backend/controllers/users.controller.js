const users = [
    { 
        id: 'admin_1', 
        name: 'LeadZen Admin', 
        email: 'admin@leadzen.ai', 
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    },
    { 
        id: 'user_1', 
        name: 'Test User', 
        email: 'user@example.com', 
        role: 'user',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    },
    { 
        id: 'agent_1', 
        name: 'Agent Smith', 
        email: 'smith@leadzen.ai', 
        role: 'agent',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smith'
    }
];

const getUsers = (req, res) => {
    res.status(200).json({ success: true, data: users, error: null });
};

const updateUserRole = (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const user = users.find(u => u.id === id);
    if (user) {
        user.role = role;
        res.status(200).json({ success: true, data: user, error: null });
    } else {
        res.status(404).json({ success: false, data: null, error: "User not found" });
    }
};

module.exports = { getUsers, updateUserRole };
