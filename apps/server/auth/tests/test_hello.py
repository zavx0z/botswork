"""Hello unit test module."""

from server_auth.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello server-auth"
