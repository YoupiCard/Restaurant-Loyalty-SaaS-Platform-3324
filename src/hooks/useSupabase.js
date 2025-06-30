import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useSupabaseQuery = (table, query = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let supabaseQuery = supabase.from(table).select(query.select || '*')

        // Apply filters
        if (query.filters) {
          query.filters.forEach(filter => {
            supabaseQuery = supabaseQuery[filter.method](...filter.args)
          })
        }

        // Apply ordering
        if (query.orderBy) {
          supabaseQuery = supabaseQuery.order(query.orderBy.column, query.orderBy.options)
        }

        // Apply limit
        if (query.limit) {
          supabaseQuery = supabaseQuery.limit(query.limit)
        }

        const { data, error } = await supabaseQuery

        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(query)])

  return { data, loading, error }
}

export const useSupabaseMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (operation) => {
    try {
      setLoading(true)
      setError(null)
      const result = await operation()
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}

// Utility functions for common database operations
export const dbOperations = {
  // Establishments
  getEstablishments: (groupId = null) => {
    const query = {
      select: '*',
      orderBy: { column: 'created_at', options: { ascending: false } }
    }
    
    if (groupId) {
      query.filters = [{ method: 'eq', args: ['group_id', groupId] }]
    }
    
    return query
  },

  // Rewards
  getRewards: (establishmentId) => ({
    select: '*',
    filters: [{ method: 'eq', args: ['establishment_id', establishmentId] }],
    orderBy: { column: 'created_at', options: { ascending: false } }
  }),

  // Metrics
  getDailyMetrics: (establishmentId, dateRange = null) => {
    const query = {
      select: '*',
      filters: [{ method: 'eq', args: ['establishment_id', establishmentId] }],
      orderBy: { column: 'date', options: { ascending: false } }
    }
    
    if (dateRange) {
      query.filters.push(
        { method: 'gte', args: ['date', dateRange.start] },
        { method: 'lte', args: ['date', dateRange.end] }
      )
    }
    
    return query
  },

  // Spinwheel sessions
  getSpinwheelSessions: (establishmentId, limit = 100) => ({
    select: '*, rewards(*)',
    filters: [{ method: 'eq', args: ['establishment_id', establishmentId] }],
    orderBy: { column: 'created_at', options: { ascending: false } },
    limit
  })
}