'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, MessageSquare, Webhook, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AlertSettingsPage() {
  const [config, setConfig] = useState({
    email: {
      enabled: false,
      recipients: [] as string[],
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPass: '',
    },
    slack: {
      enabled: false,
      webhookUrl: '',
      channel: '#devcontrol-alerts',
    },
    webhook: {
      enabled: false,
      url: '',
      headers: {},
    },
  });

  const [recipientInput, setRecipientInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/alert-config/config');
      const data = await response.json();
      if (data.success) {
        setConfig(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch config:', err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/alert-config/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async (type: string) => {
    setIsTesting(true);
    setError('');

    try {
      const response = await fetch('/api/alert-config/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Test alert sent! Check your ' + type);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to send test alert');
    } finally {
      setIsTesting(false);
    }
  };

  const addRecipient = () => {
    if (recipientInput && recipientInput.includes('@')) {
      setConfig({
        ...config,
        email: {
          ...config.email,
          recipients: [...config.email.recipients, recipientInput],
        },
      });
      setRecipientInput('');
    }
  };

  const removeRecipient = (email: string) => {
    setConfig({
      ...config,
      email: {
        ...config.email,
        recipients: config.email.recipients.filter((r) => r !== email),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alert Settings</h1>
          <p className="text-gray-600 mt-2">Configure how you receive monitoring alerts</p>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Alert configuration saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="email" className="space-y-6">
          <TabsList>
            <TabsTrigger value="email">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="slack">
              <MessageSquare className="w-4 h-4 mr-2" />
              Slack
            </TabsTrigger>
            <TabsTrigger value="webhook">
              <Webhook className="w-4 h-4 mr-2" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          {/* Email Tab */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Receive alerts via email</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                  <Label>Enable Email Alerts</Label>
                  <Switch
                    checked={config.email.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        email: { ...config.email, enabled: checked },
                      })
                    }
                  />
                </div>

                {config.email.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label>Recipients</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="email@example.com"
                          value={recipientInput}
                          onChange={(e) => setRecipientInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                        />
                        <Button onClick={addRecipient}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.email.recipients.map((email) => (
                          <div
                            key={email}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          >
                            {email}
                            <button onClick={() => removeRecipient(email)} className="hover:text-blue-900">
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>SMTP Host</Label>
                        <Input
                          value={config.email.smtpHost}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              email: { ...config.email, smtpHost: e.target.value },
                            })
                          }
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SMTP Port</Label>
                        <Input
                          type="number"
                          value={config.email.smtpPort}
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              email: { ...config.email, smtpPort: parseInt(e.target.value) },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>SMTP Username</Label>
                      <Input
                        value={config.email.smtpUser}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: { ...config.email, smtpUser: e.target.value },
                          })
                        }
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>SMTP Password</Label>
                      <Input
                        type="password"
                        value={config.email.smtpPass}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            email: { ...config.email, smtpPass: e.target.value },
                          })
                        }
                        placeholder="App password"
                      />
                    </div>

                    <Button variant="outline" onClick={() => handleTest('email')} disabled={isTesting}>
                      Send Test Email
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Slack Tab */}
          <TabsContent value="slack">
            <Card>
              <CardHeader>
                <CardTitle>Slack Notifications</CardTitle>
                <CardDescription>Send alerts to Slack channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                  <Label>Enable Slack Alerts</Label>
                  <Switch
                    checked={config.slack.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        slack: { ...config.slack, enabled: checked },
                      })
                    }
                  />
                </div>

                {config.slack.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label>Slack Webhook URL</Label>
                      <Input
                        value={config.slack.webhookUrl}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            slack: { ...config.slack, webhookUrl: e.target.value },
                          })
                        }
                        placeholder="https://hooks.slack.com/services/..."
                      />
                      <p className="text-xs text-gray-500">
                        Get your webhook URL from Slack&apos;s{' '}
                        <a
                          href="https://api.slack.com/messaging/webhooks"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Incoming Webhooks
                        </a>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Channel</Label>
                      <Input
                        value={config.slack.channel}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            slack: { ...config.slack, channel: e.target.value },
                          })
                        }
                        placeholder="#devcontrol-alerts"
                      />
                    </div>

                    <Button variant="outline" onClick={() => handleTest('slack')} disabled={isTesting}>
                      Send Test Message
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhook Tab */}
          <TabsContent value="webhook">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Notifications</CardTitle>
                <CardDescription>Send alerts to custom endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                  <Label>Enable Webhook Alerts</Label>
                  <Switch
                    checked={config.webhook.enabled}
                    onCheckedChange={(checked) =>
                      setConfig({
                        ...config,
                        webhook: { ...config.webhook, enabled: checked },
                      })
                    }
                  />
                </div>

                {config.webhook.enabled && (
                  <>
                    <div className="space-y-2">
                      <Label>Webhook URL</Label>
                      <Input
                        value={config.webhook.url}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            webhook: { ...config.webhook, url: e.target.value },
                          })
                        }
                        placeholder="https://your-api.com/webhooks/devcontrol"
                      />
                    </div>

                    <Button variant="outline" onClick={() => handleTest('webhook')} disabled={isTesting}>
                      Send Test Webhook
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </div>
    </div>
  );
}
