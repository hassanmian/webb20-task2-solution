const TOKEN_KEY = "BUSINESS_CRM_TOKEN";
const ROOT_URL = "https://frebi.willandskill.eu/"

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}
export const setToken = token => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const FrebiKit = {
    login: payload => {
        const url = `${ROOT_URL}api-token-auth/`
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
    },
    getCustomerList: () => {
        const token = getToken()
        console.log(token)
        const url = `${ROOT_URL}api/v1/customers/`;
        return fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
			},
		})
    },

    customer: {
        get: id => {

        },
        update: (id, payload) => {
            const url = `${ROOT_URL}api/v1/customers/${id}/`;
            const token = getToken()
            return fetch(url, {
				method: "PUT",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
        },
        create: payload => {
            const url = `${ROOT_URL}api/v1/customers/`;
            const token = getToken()
            return fetch(url, {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
        },
        delete: id => {
            const url = `${ROOT_URL}api/v1/customers/${id}/`;
            const token = getToken()
            return fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
        }
    },

    getUser: () => {
        const token = getToken()
        const url = `${ROOT_URL}api/v1/me/`;
        return fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
    },

    
}