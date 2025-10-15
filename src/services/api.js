const API_BASE_URL = 'http://localhost:8080/api'; // Замените на ваш URL



class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Projects
  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: projectData,
    });
  }

  async listProjects() {
    return this.request('/projects');
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: projectData,
    });
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Test Cases
  async createTestCase(projectId, testCaseData) {
    return this.request(`/projects/${projectId}/test-cases`, {
      method: 'POST',
      body: testCaseData,
    });
  }

  async addTestCaseVersion(testCaseId, versionData) {
    return this.request(`/test-cases/${testCaseId}/versions`, {
      method: 'POST',
      body: versionData,
    });
  }

  async listTestCaseVersions(testCaseId) {
    return this.request(`/test-cases/${testCaseId}/versions`);
  }

  // OpenQA Profiles
  async createOpenQAProfile(projectId, profileData) {
    return this.request(`/projects/${projectId}/openqa/profiles`, {
      method: 'POST',
      body: profileData,
    });
  }

  async listOpenQAProfiles(projectId) {
    return this.request(`/projects/${projectId}/openqa/profiles`);
  }

  // Runs
  async createRun(runData) {
    return this.request('/runs', {
      method: 'POST',
      body: runData,
    });
  }

  async getRun(id) {
    return this.request(`/runs/${id}`);
  }

  async listRunItems(runId) {
    return this.request(`/runs/${runId}/items`);
  }

  // Project Statuses
  async createProjectStatus(projectId, statusData) {
    return this.request(`/projects/${projectId}/statuses`, {
      method: 'POST',
      body: statusData,
    });
  }

  async listProjectStatuses(projectId) {
    return this.request(`/projects/${projectId}/statuses`);
  }
 async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Добавляем токен авторизации если есть
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Перенаправление на страницу авторизации
        window.location.href = '/auth';
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export default new ApiService();