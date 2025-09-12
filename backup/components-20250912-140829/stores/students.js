import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    selectedStudent: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getStudentById: (state) => (id) => {
      return state.students.find(student => student.id === id)
    },
    
    studentsCount: (state) => state.students.length,
    
    activeStudents: (state) => state.students.filter(student => student.status === 'active')
  },

  actions: {
    async fetchStudents() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get('/family/students')
        this.students = response.data.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error carregant els estudiants'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchStudentDetails(studentId) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await axios.get(`/family/students/${studentId}`)
        const student = response.data.data
        
        // Actualitza l'estudiant a la llista si ja existeix
        const index = this.students.findIndex(s => s.id === studentId)
        if (index !== -1) {
          this.students[index] = student
        }
        
        this.selectedStudent = student
        return { success: true, data: student }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error carregant els detalls de l\'estudiant'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    selectStudent(student) {
      this.selectedStudent = student
    },

    clearError() {
      this.error = null
    },

    resetStore() {
      this.students = []
      this.selectedStudent = null
      this.isLoading = false
      this.error = null
    }
  }
})
